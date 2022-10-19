import cv2
import numpy
import pickle
import tensorflow
from numpy.linalg import norm
from keras.models import Sequential
from keras_preprocessing import image
from sklearn.neighbors import NearestNeighbors
from keras.applications.resnet import ResNet50, preprocess_input


features_list = pickle.load(open("image_features.pkl", "rb"))
img_files_list = pickle.load(open("img_files.pkl", "rb"))

print(numpy.array(features_list).shape)

model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
model.trainable = False

model = Sequential([model, tensorflow.keras.layers.GlobalMaxPooling2D()])

img = image.load_img('sample/Shoes.jpg',target_size=(224,224))
img_array = image.img_to_array(img)
expand_img = numpy.expand_dims(img_array,axis=0)
preprocessed_img = preprocess_input(expand_img)
result_to_resnet = model.predict(preprocessed_img)
flatten_result = result_to_resnet.flatten()
# normalizing
result_normlized = flatten_result / norm(flatten_result)

neighbors = NearestNeighbors(n_neighbors = 6, algorithm='brute', metric='euclidean')
neighbors.fit(features_list)

distence, indices = neighbors.kneighbors([result_normlized])

print(indices)

for file in indices[0][1:6]:
    print(img_files_list[file])
    tmp_img = cv2.imread(img_files_list[file])
    tmp_img = cv2.resize(tmp_img,(200,200))
    cv2.imshow("output", tmp_img)
    cv2.waitKey(0)