import { useEffect, useRef, useState } from "react";

export default function Searching({search, close}){
    const [searchMenu, setSearchMenu] = useState(false);
    const toggleSearchMenu = () => {
        setSearchMenu(!searchMenu);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            const encodedQuery = encodeURIComponent(searchQuery).replace(/%20/g, '+').replace(/%2B/g, '+').toLowerCase();
            window.location.href = `/search/${encodedQuery}`;
        }
    };
    useEffect(() => {
        if (searchMenu) {
          const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
              setSearchMenu(false);
            }
          };
          const handlePopState = () => {
            setSearchMenu(false);
          };
          searchInputRef.current.focus();
          window.addEventListener('keydown', handleKeyDown);
          window.addEventListener('popstate', handlePopState);
          return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('popstate', handlePopState);
          };
        }
      }, [searchMenu]);
    return(
        <>
        <button onClick={toggleSearchMenu}>
           <img className="w-[24px] mx-5" src={search} alt="" />
        </button>
        {searchMenu && (
            <div className="fixed inset-0 bg-black flex justify-center items-center">
                <form onSubmit={handleSubmit}>
                    <button>
                       <img className="w-8 top-5 md:right-[76px] right-[10vw] absolute" src={close} alt="" onClick={toggleSearchMenu}/>
                    </button>
                    <input
                        type="search"
                        className="mb-20 p-2 font-bold md:text-5xl text-3xl text-center text-white bg-transparent border-b-[6px] outline-none md:w-[50vw] w-[70vw]"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        ref={searchInputRef}
                    />
                </form>
            </div>
        )}
        </>
    )
    
}