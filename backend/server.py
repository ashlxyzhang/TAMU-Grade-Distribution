from flask import Flask, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
import os

app = Flask(__name__)
CORS(app)

uri = f"mongodb://{os.environ.get('MONGO_USER')}:{os.environ.get('MONGO_PASS')}@ac-yb1xzek-shard-00-00.nnsegmo.mongodb.net:27017,ac-yb1xzek-shard-00-01.nnsegmo.mongodb.net:27017,ac-yb1xzek-shard-00-02.nnsegmo.mongodb.net:27017/?ssl=true&replicaSet=atlas-o8w97c-shard-0&authSource=admin&retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['TAMUgrds']
grds = db['grds']
profs = db['profLinks']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# df = pd.read_csv('backend/grds/arch.csv')
# json = df.to_json()

# @app.route('/')
# def html_table():
#     return render_template('index.html',  tables=[df.to_html(classes='data')], titles=df.columns.values)

@app.route('/data')
def get_grds():
    dep = request.args.get('dep')
    course = request.args.get('course')
    prof = request.args.get('prof')

    query = {}
    if dep and course: query['COURSE'] = dep + " " + course
    if prof: query['PROF'] = { '$regex': prof }

    return json_util.dumps(list(grds.find(query))) if query != {} else []

@app.route('/profs')
def get_profs():
    return json_util.dumps(list(profs.find({})))

if __name__ == '__main__':
    app.run(debug=True)