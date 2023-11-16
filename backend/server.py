from flask import Flask, render_template, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_csv('backend/grds/arch.csv')
json = df.to_json()

# @app.route('/')
# def html_table():
#     return render_template('index.html',  tables=[df.to_html(classes='data')], titles=df.columns.values)

@app.route('/data')
def get_grds():
    return json

if __name__ == '__main__':
    app.run(debug=True)