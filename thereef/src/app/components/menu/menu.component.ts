import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ResourceOwner } from '../../../domain/models/User';
import { AquariaRepository } from '../../../infrastructure/repositories/AquariaRepository';
import { Aquaria } from '../../../domain/models/Aquaria';

interface MenuItem {
  label: string;
  link: string;
  active: boolean;
}

@Component({
  selector: 'reef-menu',
  standalone: true,
  imports: [LogoComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public loggedUser!: ResourceOwner;
  public menu: MenuItem[] = [
    {
      label: 'Início',
      link: '/home',
      active: true
    },
    {
      label: 'Equipamentos',
      link: '/login',
      active: false
    }
  ];
  public aquarium!: Aquaria;

  constructor(
    private router: Router,
    private authService: AuthService,
    private aquariaRepository: AquariaRepository,
  ){}

  changeMenu(selectedOption: MenuItem): void {
    this.menu.forEach(menuItem => {
      menuItem.active = menuItem.label === selectedOption.label;
    });

    this.router.navigate([selectedOption.link]);
  }


  loadAquariums() {
    this.aquariaRepository.list()
      .subscribe((response) => {
        if (response.length) {
          this.aquarium = response[0];
        }
      })
  }

  ngOnInit() {
    this.loggedUser = this.authService.getUser();
    this.loadAquariums();
  }
}
