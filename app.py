import os
import tqdm
import numpy
import pickle
import tensorflow
from numpy.linalg import norm
from keras.models import Sequential
from keras_preprocessing import image
from keras.applications.resnet import ResNet50, preprocess_input

model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
model.trainable = False

model = Sequential([model, tensorflow.keras.layers.GlobalMaxPooling2D()])
# model.summary()

def extract_features(img_path,model):
    img = image.load_img(img_path,target_size=(224,224))
    img_array = image.img_to_array(img)
    expand_img = numpy.expand_dims(img_array,axis=0)
    preprocessed_img = preprocess_input(expand_img)
    result_to_resnet = model.predict(preprocessed_img)
    flatten_result = result_to_resnet.flatten()
    
    # normalizing
    result_normlized = flatten_result / norm(flatten_result)

    return result_normlized

#print(os.listdir('fashion_small/images'))
img_files = []

for fashion_images in os.listdir('fashion_small/images'):
    images_path = os.path.join('fashion_small/images', fashion_images)
    img_files.append(images_path)

# extracting image features
image_features = []

for files in tqdm(img_files):
    features_list = extract_features(files, model)
    image_features.append(features_list)

pickle.dump(image_features, open("image_features.pkl", "wb"))
pickle.dump(img_files, open("img_files.pkl", "wb"))
