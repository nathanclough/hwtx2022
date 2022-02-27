from datetime import datetime, timezone, timedelta

from functools import wraps
from unicodedata import name
from datetime import datetime
from flask import request
from flask_restx import Api, Resource, fields

import jwt

from .models import db, Tournaments, Users, JWTTokenBlocklist
from .config import BaseConfig

dtFormat = '%Y-%m-%dT%H:%M:%S.%f%z'

rest_api = Api(version="1.0", title="Users API")


"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "walletPubkey": fields.String(required=True, min_length=4, max_length=16),
                                              "tournamentId": fields.Integer(required=True)
                                              })

tournament_model = rest_api.model('TournamentModel',{
                                                        "name":fields.String(required=True, min_length=2, max_length=32),
                                                        "game":fields.String(required=True, max_length=64),
                                                        "entryCount":fields.Integer(required=True),
                                                        "startTime":fields.DateTime(required=True, dt_format='iso8602'),
                                                        "entryFee":fields.Integer(required=True),
                                                        "description":fields.String(required=False,max_length=256)
                                                    })

tournament_search_model = rest_api.model('TournamentSearchModel',{
                                                        "name":fields.String(required=False, max_length=32),
                                                        "game":fields.String(required=False, max_length=64),
                                                        "entryCount":fields.Integer(required=False),
                                                        "startTime":fields.DateTime(required=False, dt_format='iso8602'),
                                                        "entryFee":fields.Integer(required=False),
                                                        "description":fields.String(required=False,max_length=256)
                                                    })

"""
   Helper function for JWT token required
"""

def token_required(f):

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(current_user, *args, **kwargs)

    return decorator


"""
    Flask-Restx routes
"""

@rest_api.route('/api/tournaments/create')
class CreateTournament(Resource):
    """
        creates a tournament
    """
    @rest_api.expect(tournament_model, validate=True)
    def post(self):
        req_data = request.get_json()
        _name = req_data.get("name")
        _game = req_data.get("game")
        _entryCount = req_data.get("entryCount")
        _startTime = datetime.strptime(req_data.get("startTime"),dtFormat)
        _entryFee = req_data.get("entryFee")
        _desc = req_data.get("description")

        new_tournament = Tournaments(name=_name, game=_game, 
        entryCount=_entryCount, startTime=_startTime,entryFee=_entryFee,
        description=_desc)

        new_tournament.save()

        return {"success": True,
                "tournamentId": new_tournament.id,
                "msg": f"The tournament {_name} was successfully registered"}, 200

@rest_api.route('/api/tournaments/search')
class SearchTournaments(Resource):
    """ searchs the tournament """

    @rest_api.expect(tournament_search_model, validate=True)
    def post(self):
        req_data = request.get_json()
        _name = req_data.get("name")

        result = Tournaments.get_by_text(_name)
        return {"success": True,
                "result": result}

@rest_api.route('/api/users/register')
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _username = req_data.get("username")
        _email = req_data.get("email")
        _pubKey = req_data.get("walletPubkey")
        _tournament_id = req_data.get("tournamentId")

        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400

        new_user = Users(username=_username, email=_email, pubkey=_pubKey, tournament_id=_tournament_id)

        new_user.save()

        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200