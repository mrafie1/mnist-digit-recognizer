from flask import Flask, request, jsonify, render_template
import tensorflow as tf
import numpy as np
import base64
import re
from io import BytesIO
from PIL import Image

app = Flask(__name__)
model = tf.keras.models.load_model('my_model.h5')

@app.route('/')
def index():
    return render_template('base.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    img_data = re.sub('^data:image/.+;base64,', '', data['image'])
    img = Image.open(BytesIO(base64.b64decode(img_data))).convert('L')
    print(np.array(img))
    img = img.resize((28, 28))

    img = np.array(img)
    img = img / 255
    img = img.reshape(1, 28 * 28)
    
    prediction = model.predict(img)
    print(img)
    print(prediction)
    predicted_class = np.argmax(prediction)

    return jsonify({'prediction': int(predicted_class)})

if __name__ == '__main__':
    app.run(debug=True)

