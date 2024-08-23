from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URI = os.getenv('DATABASE_URI')

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    educational_contents = db.relationship('EducationalContent', backref='author', lazy=True)
    user_ar_experiences = db.relationship('ARExperience', backref='user', lazy=True)

class EducationalContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    content_link = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class ARExperience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ar_experience_name = db.Column(db.String(100), nullable=False)
    ar_experience_description = db.Column(db.Text, nullable=False)
    ar_experience_link = db.Column(db.String(250), nullable=False)
    ar_objects = db.relationship('ARObject', backref='ar_experience', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class ARObject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    object_name = db.Column(db.String(100), nullable=False)
    object_file_link = db.Column(db.String(250), nullable=False)
    ar_experience_id = db.Column(db.Integer, db.ForeignKey('ar_experience.id'), nullable=False)