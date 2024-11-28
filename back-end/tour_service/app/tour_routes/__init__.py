from flask import Blueprint
from .get_tour import get_tour_blueprint
from .register import register_tour_blueprint
from .save_tour import save_tour_blueprint

tour_blueprint = Blueprint('tour', __name__)

# dang ky cac blueprint
tour_blueprint.register_blueprint(get_tour_blueprint)
tour_blueprint.register_blueprint(register_tour_blueprint)
tour_blueprint.register_blueprint(save_tour_blueprint)