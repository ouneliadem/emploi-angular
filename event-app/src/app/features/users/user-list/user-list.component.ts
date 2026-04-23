import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.usersService.refresh$.subscribe(() => this.loadUsers());
  }

  deleteUser(id: string): void {
    this.usersService.delete(id).subscribe({
      next: () => this.loadUsers(),
      error: () => {
        this.errorMessage = 'Suppression impossible.';
      },
    });
  }

  initialsOf(user: User): string {
    return user.name
      .split(' ')
      .filter((part) => !!part)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  }

  private loadUsers(): void {
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les utilisateurs.';
      },
    });
  }
}
