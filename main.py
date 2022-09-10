from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import os
import joblib
import numpy as np
from flask import Flask, abort, redirect, render_template, request

app = Flask(__name__)

l = [{'title':'ankhiq yg', 't2': 'resd'},{'title':'ankhiq pjhhh', 't2': 'res1'},{'title':'ankit k na', 't2': 'res2'},]

class Sonar(object):
    def __init__(self):
        BASE_DIR = os.path.join(os.path.dirname(__file__), './data')
        model_file = os.path.join(BASE_DIR, 'model.joblib')
        preprocessor_file = os.path.join(BASE_DIR, 'preprocess.joblib')
        self.estimator = joblib.load(model_file)
        self.preprocessor = joblib.load(preprocessor_file)
    def ping(self, text):
        assert isinstance(text, str)
        vector = self.preprocessor.transform([text])
        proba = self.estimator.predict_proba(vector)[0]
        mapping = {0: True, 1: True, 2: False}
        res = {
            'text': text,
            'state': mapping[np.argmax(proba)],
            # 'classes': [
            #     {'class_name': mapping[k], 'confidence': proba[k]} 
            #     for k in sorted(mapping)
            # ]
        }
        return res['state'], res['text']
    def get_weights(self, text):
        def get_class_idx():
            res = self.ping(text)
            for i, class_ in enumerate(res['classes']):
                if class_['class_name'] == res['top_class']:
                    return i
        class_idx = get_class_idx()
        features = self.preprocessor.get_feature_names()
        weights = self.estimator.coef_[class_idx]
        word2weight = {f: w for f, w in zip(features, weights)}
        tokenize = self.preprocessor.build_analyzer()
        words = tokenize(text)
        return {w: word2weight.get(w, 0) for w in words}

Profanity_check_object = Sonar()

@app.route('/')
def home():
    print(Profanity_check_object.ping(request.args.get('word')))
    print(Profanity_check_object.ping('fuck'))
    return render_template('home.html', posts = l)




app.run(debug=True)