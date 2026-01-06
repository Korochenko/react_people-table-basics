import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, SetPeople] = useState<Person[]>([]);
  const [error, SetError] = useState<string | null>(null);
  const [loading, SetLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    const LoadPeople = async () => {
      SetLoading(true);

      try {
        const data = await getPeople();

        SetPeople(data);
      } catch (err) {
        SetError('Something went wrong');
      } finally {
        SetLoading(false);
      }
    };

    LoadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && !loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map((person: Person) => {
                  const mother = people.find(p => p.name === person.motherName);
                  const father = people.find(p => p.name === person.fatherName);
                  const isSelected = person.slug === slug;

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={isSelected ? 'has-background-warning' : ''}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td style={{ color: 'red' }}>
                        <PersonLink person={mother} name={person.motherName} />
                      </td>
                      <td>
                        <PersonLink person={father} name={person.fatherName} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
