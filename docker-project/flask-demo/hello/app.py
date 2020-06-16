from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '111--Hello World!'

@app.route('/index')
def index():
    return '我是index!'

if __name__ == '__main__':
    app.run()