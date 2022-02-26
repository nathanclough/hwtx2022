from datetime import datetime

import json
from re import search
from unicodedata import name

from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Tournaments(db.Model):
    __tablename__ = 'Tournaments'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    game = db.Column(db.String(64), nullable=False)
    entryCount = db.Column(db.Integer, nullable=True)
    startTime = db.Column(db.DateTime,nullable=False)
    entryFee = db.Column(db.Integer,nullable=False)
    description = db.Column(db.String(256))

    def __repr__(self):
        return f"Tournament {self.name}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def updateEntryCount(self, count):
        self.entryCount = count

    def updateStartTime(self,time):
        self.startTime = time

    @classmethod
    def get_by_text(cls, search):
        search = f"{search}%"
        print(search)
        result = cls.query.filter(cls.name.like(search)).all() 
        return [(row.name, row.id) for row in result]

class Users(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    pubkey = db.Column(db.String(), nullable=False)
    tournament_id = db.Column(db.Integer, db.ForeignKey("Tournaments.id"), nullable=False)

    def __repr__(self):
        return f"User {self.username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update_username(self, new_username):
        self.username = new_username

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email

        return cls_dict

    def toJSON(self):
        return self.toDICT()


class JWTTokenBlocklist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jwt_token = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f"Expired Token: {self.jwt_token}"

    def save(self):
        db.session.add(self)
        db.session.commit()
        



