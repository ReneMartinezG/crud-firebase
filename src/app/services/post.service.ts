import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from 'src/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private angularFirestore: AngularFirestore) {}

  getPost() {
    return this.angularFirestore.collection('posts').snapshotChanges();
  }

  getPostById(id: string) {
    return this.angularFirestore.collection('posts').doc(id).valueChanges();
  }

  createPost(post: Post) {
    return new Promise<Post>((resolve, reject) => {
      this.angularFirestore
        .collection('posts')
        .add(post)
        .then(
          (response) => {
            console.log(response);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  updatePost(post: Post, id: string) {
    return this.angularFirestore.collection('posts').doc(id).update({
      title: post.title,
      content: post.content,
      author: post.author,
    });
  }

  deletePost(post: Post) {
    return this.angularFirestore.collection('posts').doc(post.id).delete();
  }
}
