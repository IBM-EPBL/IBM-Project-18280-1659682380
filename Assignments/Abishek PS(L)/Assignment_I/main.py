from flask import Flask, render_template, url_for, redirect, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("./registration.html")

@app.route('/success/<name>/<phone>/<email>')
def success(name=None,phone=None,email=None):
    return " <h1>Hello {}<br>You registered successfully with your email {}<br>We will contact you later with {}</h1>".format(name,email,phone,phone)

@app.route("/login",methods =['POST','GET'])
def login():
    if request.method == 'POST':
        user = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        return redirect(url_for("success", name = user ,phone = phone ,email = email ))

    else:
        user = request.args.get("input_name")
        return redirect(url_for("success",name=user))

if __name__ == '__main__':
    app.run(debug=True)
