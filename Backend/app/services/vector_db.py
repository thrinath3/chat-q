import chromadb
import uuid

# persistent DB (stored on disk)
client = chromadb.PersistentClient(path="./chroma_db")

# Global reference to current collection (active session/file)
current_collection = None
current_collection_name = None
# delete old collection
def reset_collection():
    global current_collection, current_collection_name
    if current_collection_name:
        try:
            client.delete_collection(name=current_collection_name)
        except Exception as e:
            print("Collection delete error (safe to ignore):", e)
    # create fresh collection after deleting previous one
    create_new_collection()

# creating new collection(on file upload)
def create_new_collection():
    global current_collection, current_collection_name
    # generate unique collection name for each file/session
    current_collection_name = f"notes_{str(uuid.uuid4())}"
    current_collection = client.get_or_create_collection(
        name=current_collection_name
    )
    return current_collection_name

# storing embeddings on current file
def store_embeddings(chunks, embeddings):
    global current_collection
    if current_collection is None:
        create_new_collection()
    ids = [str(uuid.uuid4()) for _ in chunks]
    current_collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings
    )

# query embeddings on current file
def query_embeddings(query_embedding, top_k=3):
    global current_collection
    if current_collection is None:
        return []
    results = current_collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )
    return results.get("documents", [[]])[0]