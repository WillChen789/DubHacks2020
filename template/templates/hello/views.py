from flask import render_template, Blueprint, Response
hello_blueprint = Blueprint('hello',__name__)

import io
import cv2

vc = cv2.VideoCapture(0)

@hello_blueprint.route('/')
@hello_blueprint.route('/hello')
def index():
	return render_template("index.html")

def gen():
    """Video streaming generator function."""
    while True:
        read_return_code, frame = vc.read()
        encode_return_code, image_buffer = cv2.imencode('.jpg', frame)
        io_buf = io.BytesIO(image_buffer)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + io_buf.read() + b'\r\n')


@hello_blueprint.route('/stream')
def stream():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(
        gen(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )
