import { Person } from '../types';

interface PersonLinkProps {
  person?: Person;
  name?: string | null;
}

export const PersonLink = ({ person, name }: PersonLinkProps) => {
  if (person) {
    return (
      <a
        href={`#/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </a>
    );
  }

  if (name) {
    return <>{name}</>;
  }

  return <>-</>;
};
