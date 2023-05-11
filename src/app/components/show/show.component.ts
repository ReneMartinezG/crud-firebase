import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/models/post.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass']
})
export class ShowComponent implements OnInit {
posts:Post[];

  constructor(private postService:PostService) { }

  ngOnInit(): void {
      this.postService.getPost().subscribe( (res)=>{
        this.posts = res.map ( (e) =>{
          return {
            id: e.payload.doc.id,
            ... (e.payload.doc.data() as Post)
          }
        });
      })
  }

  deleteRow(post){
    this.postService.deletePost(post);
  }
}
