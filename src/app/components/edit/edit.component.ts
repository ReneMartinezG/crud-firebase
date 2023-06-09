import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/models/post.model';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  public editForm:FormGroup;
  postRef:any;
  constructor (
    public postService:PostService,
    public formBuilder:FormBuilder,
    private activeRoute:ActivatedRoute,
    private router:Router

  ) {
    this.editForm = this.formBuilder.group({
      title: [''],
      content: [''],
      author: [''],
    });
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe( (res)=>{
      this.postRef = res;
      this.editForm = this.formBuilder.group({
        title: [this.postRef.title],
        content: [this.postRef.content],
        author: [this.postRef.author],
      });

    });
  }

  onSubmit(){
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.postService.updatePost(this.editForm.value, id);
    this.router.navigate(['']);

  }
}
