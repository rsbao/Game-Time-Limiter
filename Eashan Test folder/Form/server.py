from flask import Flask, render_template, request
from forms import SignUpForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

@app.route('/')
def home():
    return render_template('master.html')

@app.route('/signup')
def signup():
    form = SignUpForm()
    if form.is_submitted():
#WORK ON THIS
    return render_template('signup.html', form=form)


if __name__=='__main__':
    app.run()

#https://www.youtube.com/watch?v=DxI4jnb5m1Q&list=PLB5jA40tNf3vX6Ue_ud64DDRVSryHHr1h&index=5