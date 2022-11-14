from flask import Flask, render_template, url_for, redirect, request
import json
app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
@app.route('/register',methods=['GET','POST'])
def register():
    if request.method == "POST":
        user = {}
        user['name'] = request.form['name']
        user['email'] = request.form['email']
        user['phone'] = request.form['phone']
        return redirect(url_for(".success",user=json.dumps(user)))
    return render_template("registration.html")

@app.route('/success')
def success():
    return render_template("success.html",user=json.loads(request.args['user']))
