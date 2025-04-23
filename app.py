from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime  # 🔥 import datetime at the top


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///names.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Define a model
class Visitor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)  # 💫 Add this line

# Create the database
with app.app_context():
    db.create_all()


@app.route("/", methods=["GET", "POST"])
def home():
    name = None

    if request.method == "POST":
        name = request.form["name"]
        new_visitor = Visitor(name=name)
        db.session.add(new_visitor)
        db.session.commit()

    visitors = Visitor.query.all()
    return render_template("index.html", name=name, visitors=visitors)

if __name__ == "__main__":
    app.run(debug=True)
