from flask import Flask, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
import os

app = Flask(__name__)
CORS(app)

uri = f"mongodb+srv://{os.environ.get('MONGO_USER')}:{os.environ.get('MONGO_PASS')}@tamugrds.nnsegmo.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['TAMUgrds']
collection = db['collection']

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

    print(dep, course, prof)

    query = {}
    if dep and course: query['COURSE'] = dep + " " + course
    if prof: query['PROF'] = { '$regex': prof }

    return json_util.dumps(list(collection.find(query))) if query != {} else []

if __name__ == '__main__':
    app.run(debug=True)