import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Candidate } from '../entities/candidate';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  candidatesCollection: AngularFirestoreCollection<Candidate>;
  candidates: Observable<Candidate[]>;
  displayedColumns: string[] = ['name', 'cv', 'status', 'actions'];

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.candidatesCollection = this.db.collection<Candidate>('candidates');
    this.candidates = this.candidatesCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => ({ id: action.payload.doc.id, ...action.payload.doc.data() })))
    );
  }

  async approve(candidate: Candidate) {
    this.candidatesCollection.doc(candidate.id).update({ status: 'Approved' });
  }

  async decline(candidate: Candidate) {
    this.candidatesCollection.doc(candidate.id).update({ status: 'Declined' });
  }

}
