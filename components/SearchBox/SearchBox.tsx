import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function SearchBox({ search, setSearch }: SearchBoxProps) {
  return (
    <div className={css.inputWrapper}>
      <input
        className={css.input}
        defaultValue={search}
        onChange={e => {
          setSearch(e.target.value);
        }}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
}
