import ibm_db
from flask import Flask, render_template, redirect, request, session

app = Flask(__name__)

app.secret_key='a'
dsn_hostname = "*****"
dsn_uid = "*****"
dsn_pwd = "*****"
dsn_driver = "{IBM DB2 ODBC DRIVER}"
dsn_database = "*****"
dsn_port = "*****"
dsn_protocol = "TCPIP"
dsn_security = "SSL"

dsn = ("DRIVER={0};""DATABASE={1};""HOSTNAME={2};""PORT={3};""PROTOCOL={4};""UID={5};""PWD={6};""SECURITY={7};").format(
    dsn_driver,dsn_database,dsn_hostname,dsn_port,dsn_protocol,dsn_uid,dsn_pwd,dsn_security,)

try:
    conn = ibm_db.connect(dsn, "", "")
    print ("Connected to database: ", dsn_database, "as user: ", dsn_uid, "on host: ", dsn_hostname)
    @app.route("/",methods=['GET','POST'])
    @app.route("/register",methods=['GET','POST'])
    def register():
        msg = None
        if request.method == 'POST':
            name=request.form['name']
            rollno=request.form['rollno']
            email=request.form['email']
            password=request.form['password']
            
            select_sql = "Select * from register where email=?"
            stmt = ibm_db.prepare(conn,select_sql)
            ibm_db.bind_param(stmt,1,email)
            ibm_db.execute(stmt)
            user = ibm_db.fetch_assoc(stmt)
            if user:
                msg = "User with this email already exists!"
                return render_template("register.html",msg = msg)
            else:
                insert_sql = "Insert into register Values (?,?,?,?)"
                stmt = ibm_db.prepare(conn,insert_sql)
                ibm_db.bind_param(stmt,1,name)
                ibm_db.bind_param(stmt,2,rollno)
                ibm_db.bind_param(stmt,3,email)
                ibm_db.bind_param(stmt,4,password)
                ibm_db.execute(stmt)
                return redirect("/login")
        return render_template("register.html")

    @app.route("/login",methods=['GET','POST'])
    def login():
        msg = None
        if request.method == 'POST':
            email=request.form['email']
            password=request.form['password']

            select_sql = "Select * from register where email=?"
            stmt = ibm_db.prepare(conn,select_sql)
            ibm_db.bind_param(stmt,1,email)
            ibm_db.execute(stmt)
            user = ibm_db.fetch_assoc(stmt)
            if not user:
                msg = "User with this email does not exist!"
                return render_template("login.html",msg = msg)
            elif user['PASSWORD'] != password:
                msg = "Incorrect Passowrd!"
                return render_template("login.html",msg = msg)
            else:
                session['loggedin'] = True
                session['id'] = user['EMAIL']
                session['username'] = user['NAME']
                return redirect('/welcome')
        return render_template("login.html")

    @app.route("/logout")
    def logout():
        session['loggedin'] = False
        session['id'] = ""
        session['username'] = ""
        return render_template("login.html",msg="Logged out successfully!")

    @app.route("/welcome")
    def welcome():
        return render_template("welcome.html",)

except:
    print ("Unable to connect: ", ibm_db.conn_errormsg() )

if __name__ == '__main__':
    app.run(debug=True)
