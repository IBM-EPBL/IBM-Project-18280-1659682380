from flask import Flask,request,jsonify
import ibm_db
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import date
import json
dsn_hostname = "9938aec0-8105-433e-8bf9-0fbb7e483086.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud"
dsn_uid = "llg47061"
dsn_pwd = "SGk1gUnQkd6ECxfp"

dsn_driver = "{IBM DB2 ODBC DRIVER}"
dsn_database = "bludb"
dsn_port = "32459"
dsn_protocol = "TCPIP"
dsn_security = "SSL"

dsn = (
    "DRIVER={0};"
    "DATABASE={1};"
    "HOSTNAME={2};"
    "PORT={3};"
    "PROTOCOL={4};"
    "UID={5};"
    "PWD={6};"
    "SECURITY={7};"
).format(
    dsn_driver,
    dsn_database,
    dsn_hostname,
    dsn_port,
    dsn_protocol,
    dsn_uid,
    dsn_pwd,
    dsn_security,
)

bcrypt = Bcrypt()

app = Flask(__name__)
app.secret_key='a'
CORS(app)

try:
    conn = ibm_db.connect(dsn, "", "")
    @app.route("/login",methods=['GET','POST'])
    def login():
        response = {}
        response['code'] = None
        response['user'] = None
        if request.method == 'POST':
            email=request.form['email']
            password=request.form['password']
            select_sql = "Select * from Users where email=?"
            stmt = ibm_db.prepare(conn,select_sql)
            ibm_db.bind_param(stmt,1,email)
            ibm_db.execute(stmt)
            user = ibm_db.fetch_assoc(stmt)
            if not user:
                response['code']="user-not-found"
            elif bcrypt.check_password_hash(user['PASSWORD'], password.encode()) == False:
                response['code'] = "wrong-password"
            else:
                response['code'] = "ok"
                response['user'] = user
        return jsonify(response)

    @app.route("/signup",methods=['GET','POST'])
    def signup():
        response = {}
        response['code'] = None
        if request.method == 'POST':
            name=request.form['name']
            email=request.form['email']
            password=request.form['password']
            
            select_sql = "Select * from Users where email=?"
            stmt = ibm_db.prepare(conn,select_sql)
            ibm_db.bind_param(stmt,1,email)
            ibm_db.execute(stmt)
            user = ibm_db.fetch_assoc(stmt)
            if user:
                response['code'] = "email-already-in-use"
            else:
                insert_sql = "Insert into Users Values (?,?,?,?)"
                stmt = ibm_db.prepare(conn,insert_sql)
                ibm_db.bind_param(stmt,1,name)
                ibm_db.bind_param(stmt,2,email)
                ibm_db.bind_param(stmt,3,bcrypt.generate_password_hash(password).decode())
                ibm_db.bind_param(stmt,4,date.today())
                ibm_db.execute(stmt)
                response['code'] = "ok"
        return jsonify(response)
    
    @app.route("/getCategory",methods=['GET'])
    def getCategories():
        response = {}
        select_stmt = "SELECT Category,SYSTOOLS.BSON2JSON(ITEMS) AS ITEMS FROM CATEGORIES;"
        stmt = ibm_db.prepare(conn,select_stmt)
        ibm_db.execute(stmt)
        mens = ibm_db.fetch_assoc(stmt)
        womens = ibm_db.fetch_assoc(stmt)
        response['mens'] = mens['ITEMS']
        response['womens'] = womens['ITEMS']
        return jsonify(response)
    
    @app.route("/placeOrder",methods=['POST'])
    def placeOrder():
        response = {}
        response['code'] = "ok"
        if request.method == 'POST':
            name=request.form['NAME']
            value = {}
            value['items'] = request.form['ITEMS']
            value['total'] = request.form['TOTAL']
            insert_stmt = "INSERT INTO ORDERS VALUES('"+name+"',SYSTOOLS.JSON2BSON('"+json.dumps(value)+"'));"
            stmt = ibm_db.prepare(conn,insert_stmt)
            ibm_db.execute(stmt)
        return jsonify(response)

    @app.route("/admin",methods=['GET','POST'])
    def getOrderDetails():
        result=[]
        select_stmt = "SELECT NAME,SYSTOOLS.BSON2JSON(ITEMS) AS ITEMS FROM ORDERS"
        stmt = ibm_db.prepare(conn,select_stmt)
        ibm_db.execute(stmt)
        res = ibm_db.fetch_assoc(stmt)
        while res is not False:
            obj = {}
            name = res['NAME']
            cartItems = json.loads(res['ITEMS'])
            productArray = json.loads(cartItems['items'])
            total = json.loads(cartItems['total'])
            res = ibm_db.fetch_assoc(stmt)
            obj['name'] = name
            obj['items'] = productArray
            obj['total'] = total
            result.append(obj)
        return result

    @app.route("/user-details",methods=['GET'])
    def getUserDetails() :
        result=[]
        select_stmt = "SELECT * FROM Users"
        stmt = ibm_db.prepare(conn,select_stmt)
        ibm_db.execute(stmt)
        res = ibm_db.fetch_assoc(stmt)
        while res is not False:
            result.append(res)
            res = ibm_db.fetch_assoc(stmt)
        return result
except:
    print ("Unable to connect: ", ibm_db.conn_errormsg())