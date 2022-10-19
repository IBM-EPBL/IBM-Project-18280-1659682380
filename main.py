import os
import numpy
import pickle
import streamlit
import tensorflow
from PIL import Image
from numpy.linalg import norm
from keras.models import Sequential
from keras_preprocessing import image
from sklearn.neighbors import NearestNeighbors
from keras.applications.resnet import ResNet50, preprocess_input


features_list = pickle.load(open("image_features.pkl", "rb"))
img_files_list = pickle.load(open("img_files.pkl", "rb"))

model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
model.trainable = False
model = Sequential([model, tensorflow.keras.layers.GlobalMaxPooling2D()])

streamlit.title('Clothing recommender system')


def save_file(uploaded_file):
    try:
        with open(os.path.join("uploader", uploaded_file.name), 'wb') as f:
            f.write(uploaded_file.getbuffer())
            return 1
    except:
        return 0

def extract_img_features(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expand_img = numpy.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expand_img)
    result_to_resnet = model.predict(preprocessed_img)
    flatten_result = result_to_resnet.flatten()
    # normalizing
    result_normlized = flatten_result / norm(flatten_result)

    return result_normlized


def recommendd(features, features_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(features_list)

    distence, indices = neighbors.kneighbors([features])

    return indices

uploaded_file = streamlit.file_uploader("Choose your image")
if uploaded_file is not None:
    if save_file(uploaded_file):
        # display image
        show_images = Image.open(uploaded_file)
        size = (400, 400)
        resized_im = show_images.resize(size)
        streamlit.image(resized_im)
        # extract features of uploaded image
        features = extract_img_features(os.path.join("uploader", uploaded_file.name), model)
        #st.text(features)
        img_indicess = recommendd(features, features_list)
        col1,col2,col3,col4,col5 = streamlit.columns(5)

        with col1:
            streamlit.header("I")
            streamlit.image(img_files_list[img_indicess[0][0]])

        with col2:
            streamlit.header("II")
            streamlit.image(img_files_list[img_indicess[0][1]])

        with col3:
            streamlit.header("III")
            streamlit.image(img_files_list[img_indicess[0][2]])

        with col4:
            streamlit.header("IV")
            streamlit.image(img_files_list[img_indicess[0][3]])

        with col5:
            streamlit.header("V")
            streamlit.image(img_files_list[img_indicess[0][4]])
    else:
        streamlit.header("Some error occur")    