from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)

df = pd.read_csv('./grds/carc.csv')
@app.route('/')
def html_table():
    return render_template('simple.html',  tables=[df.to_html(classes='data')], titles=df.columns.values)

if __name__ == '__main__':
    app.run(debug=True)