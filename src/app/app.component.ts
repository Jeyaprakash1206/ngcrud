import { PersonService } from './person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from './Person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonService]
})
export class AppComponent implements OnInit {
  title = 'app';
  personDetails: Array<Person>;
  selectedPerson: Person;
  action = 'Add';

  constructor(private _personService: PersonService) { }

  ngOnInit() {
    this.selectedPerson = { _id: '', Name: '' };
    this._personService.getPersons()
      .subscribe(resPersonData => this.personDetails = resPersonData);
  }
  onSelectVideo(person: Person) {
    this.selectedPerson = person;
    this.action = 'Update';
  }
  onSubmit(person: Person) {
    console.log('onSubmit', person);
    if (this.action === 'Add') {
      this._personService.addPerson(person)
        .subscribe(resNewPerson => {
          console.log('resNewPerson', resNewPerson);
          this.personDetails.push(resNewPerson);
          this.selectedPerson = resNewPerson;
        });
    } else {
      this._personService.updatePerson(person)
        .subscribe(resNewPerson => {
          console.log('res', resNewPerson);
        });
    }
  }
  onDelete(person: Person) {
    console.log('on Delete');
    this._personService.deletePersons(person)
      .subscribe(resDelPerson => {
        console.log('resdeletePerson', resDelPerson);
        for (let i = 0; i < this.personDetails.length; i++) {
          if (this.personDetails[i]._id === person._id) {
            this.personDetails.splice(i, 1);
          }

        }
      });
    this.selectedPerson = { _id: '', Name: '' };
  }
}
