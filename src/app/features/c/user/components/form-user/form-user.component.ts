import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@web/app/features/c/user/models/user.model';

@Component({
  selector: 'app-form-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-user.component.html',
  styles: []
})
export class FormUserComponent implements OnChanges, OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }
  @Input() user: User;
  @Output() submitted = new EventEmitter<User>();

  userForm = this.formBuilder.group({
    user: this.formBuilder.group({
      username: this.formBuilder.control('', [Validators.required])
    }),
    person: this.formBuilder.control('', [Validators.required]),
    profile: this.formBuilder.control('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.user) {
      this.userForm.reset();
      this.userForm.setValue({
        user: {
          username: this.user.username
        },
        person: this.user.person,
        profile: this.user.profile
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.user) {
      if (this.userForm.dirty) {
        const updated = {
          user_id: this.user.user_id,
          ...this.userForm.value.user,
          person_id: this.userForm.value.person.person_id,
          profile_id: this.userForm.value.profile.profile_id
        };
        this.submitted.emit(updated);
      }
    } else {
      this.submitted.emit({
        ...this.userForm.value.user,
        person_id: this.userForm.value.person.person_id,
        profile_id: this.userForm.value.profile.profile_id
      });
    }

  }

}
