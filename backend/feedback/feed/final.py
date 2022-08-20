import pandas as pd
from joblib import load
from gensim.models import Word2Vec
from nltk.corpus import wordnet
from nltk.sentiment.vader import SentimentIntensityAnalyzer
#sklearn
def score_predictor(review: str):
    doc2vec_model = Word2Vec.load('./feed/word2vec_student.model')
    rf_model = load("./feed/rfmodel_teacher.joblib")
    def get_wordnet_pos(pos_tag):
        if pos_tag.startswith('J'):
            return wordnet.ADJ
        elif pos_tag.startswith('V'):
            return wordnet.VERB
        elif pos_tag.startswith('N'):
            return wordnet.NOUN
        elif pos_tag.startswith('R'):
            return wordnet.ADV
        else:
            return wordnet.NOUN
        
    import string
    from nltk import pos_tag
    from nltk.corpus import stopwords
    from nltk.tokenize import WhitespaceTokenizer
    from nltk.stem import WordNetLemmatizer

    def clean_text(text):
        # lower text
        text = text.lower()
        # tokenize text and remove puncutation
        text = [word.strip(string.punctuation) for word in text.split(" ")]
        # remove words that contain numbers
        text = [word for word in text if not any(c.isdigit() for c in word)]
        # remove stop words
        stop = stopwords.words('english')
        text = [x for x in text if x not in stop]
        # remove empty tokens
        text = [t for t in text if len(t) > 0]
        # pos tag text
        pos_tags = pos_tag(text)
        # lemmatize text
        text = [WordNetLemmatizer().lemmatize(t[0], get_wordnet_pos(t[1])) for t in pos_tags]
        # remove words with only one letter
        text = [t for t in text if len(t) > 1]
        # join all
        text = " ".join(text)
        return(text)

    clean_review = clean_text(review)
    df = pd.DataFrame(data = {'Review': review,'review_clean': clean_review},index = [0])
    sid = SentimentIntensityAnalyzer()
    df["sentiments"] = df["Review"].apply(lambda x: sid.polarity_scores(x))
    df = pd.concat([df.drop(['sentiments'], axis=1), df['sentiments'].apply(pd.Series)], axis=1)
    df["nb_chars"] = df["Review"].apply(lambda x: len(x))

    df["nb_words"] = df["Review"].apply(lambda x: len(x.split(" ")))

    doc2vec_df = df["review_clean"].apply(lambda x: doc2vec_model.infer_vector(x.split(" "))).apply(pd.Series)
    doc2vec_df.columns = ["doc2vec_vector_" + str(x) for x in doc2vec_df.columns]
    df = pd.concat([df, doc2vec_df], axis=1)
    ignore_cols = ["Review", "review_clean"]
    features = [c for c in df.columns if c not in ignore_cols]

    y_pred = rf_model.predict_proba(df[features])
    return(1 - y_pred[0][1])

if __name__ == "__main__":
    review = "It was great !" 
    print(score_predictor(review))
