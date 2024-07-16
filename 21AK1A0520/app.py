from flask import Flask,request,jsonify
from flask_cors import CORS
app=Flask(__name__)
CORS(app)
window_size=10
numbers_window=[]
def calculate_average():
    data=request.get_json()
    if 'number' not in data or not isinstance(data['numbers'],(int,float)):
        return jsonify({'error':'Invalidinput,expected a single number'}),400
    number =data['number']
    numbers_window.append(number)
    if len(numbers_window)>window_size:
        numbers_window.pop(0)
    average=sum(numbers_window)/len(numbers_window)
    return jsonify({'average':average,'window':numbers_window}),200
if __name__=='__main__':
    app.run(host='0,0,0,0',port=5000)
