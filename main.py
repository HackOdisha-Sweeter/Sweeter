from flask import Flask, abort, redirect, render_template

app = Flask(__name__)

l = [{'title':'ankhiq yg', 't2': 'resd'},{'title':'ankhiq pjhhh', 't2': 'res1'},{'title':'ankit k na', 't2': 'res2'},]

@app.route('/')
def home():
    return render_template('home.html', posts = l)

app.run(debug=True)