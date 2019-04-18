import pickle
import sys

ligid = sys.argv[0]
seqid = sys.argv[1]

with open('estimators_tup_PROTOTYPE.pickle', "rb") as p: 
    estimators = pickle.load(p)

with open('dfs_PROTOTYPE.pickle', "rb") as d: 
    dfs = pickle.load(d)

seq_tfidf, lig_tfidf, bc = estimators
ligs, seqs, binds = dfs

def predict(ligid: int, seqid: int) -> float: 
    one = seqid in binds[binds.lig==ligid].seq.values and ligid in binds[binds.seq==seqid].lig.values
    if one: 
        return 1
    else: 
        x = seq_tfidf.transform([seqs.iloc[ligid].sequence]).toarray()[0]
        y = lig_tfidf.transform([ligs.iloc[seqid].SMILES]).toarray()[0]
        xx = [list(x) + list(y)]
        return bc.predict_proba(xx)[0][0]

print(predict(ligid, seqid))
sys.stdout.flush()
