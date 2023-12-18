import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() colors!: string[];
  selectedColor!: string

  constructor(private parent: ParentComponent) { }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    // Your logic here
    this.selectedColor = value;
    this.parent.currentColor = value;
  }
}
