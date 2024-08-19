import { useState } from 'react';
import gitLogo from '../../assets/github-logo.png'
import Input from '../../components/Input';
import ItemRepo from '../../components/ItemRepo';
import { Container } from './styles'
import Button from '../../components/Button';
import { api } from '../../services/api';

function App() {
  
  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState([]);

  const handleSearchRepos = async () => {
    
    try {
      const {data} = await api.get(`repos/${currentRepo}`);

      if (data.id) {
        const isExist = repos.find(repo => repo.id === data.id);
  
        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
          return;
        }
      }
  
      alert('Repositório já está na lista'); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Repositório não encontrado!');
      } else {
        alert('Ocorreu um erro ao buscar o repositório. Tente novamente mais tarde.');
      }
    }
  }

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter(item => id !== item.id)); 
  }
  

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='Logo do github'/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepos} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
