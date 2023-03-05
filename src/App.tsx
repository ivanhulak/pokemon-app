import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { PokemonCard } from './PokemonCard/PokemonCard';
import { Pagination } from '@mui/material';
import { Box } from '@mui/material';
import {InputLabel} from '@mui/material';
import {MenuItem} from '@mui/material';
import {FormControl} from '@mui/material';
import { SelectChangeEvent, Select } from '@mui/material';
import axios from 'axios';


const StyledWrapper = styled('div')`
   &&{
    min-height: 100vh;
    padding: 20px 0px;
    overflow: hidden;
    background-color: #545454;
   }
`;
const StyledContainer = styled('div')`
   &&{
    max-width: 1160px;
    margin: 0 auto;
   }
`;
const MainHeader = styled(Typography)`
   &&{
    padding: 30px 0px;
    font-weight: 500;
    color: #fff;
    font-size: 42px;
    text-align: center;
   }
`;
const PokemonsStyledList = styled('div')`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
`;
type PokemonsType = { name: string, url: string }


export const App = () => {
  const [pokemons, setPokemons] = useState<PokemonsType[] | []>([])
  const [pageSize, setPageSize] = useState<number>(10);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  })

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pagination.from}&limit=${pageSize}`).then(
      response => {
        setPokemons(response.data.results)
        setPagination({ ...pagination, count: response.data.count })
      }
    ).catch(e => {
      alert(e.message)
    })
  }, [pagination.from, pageSize])

  const handleChange = (event: any, page: number) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to })
  }

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
  };
  console.log(pagination)
  return (
    <StyledWrapper>
      <StyledContainer>
        <MainHeader variant="h1">Pokemon APP</MainHeader>
        <PokemonsStyledList>
          {pokemons.map(p => {
            let pokemon_url = p.url.split('/')
            let pokemon_id = pokemon_url[pokemon_url.length - 2]
            return <PokemonCard key={pokemon_id} url={p.url} />
          })}
        </PokemonsStyledList>
        <Box
          sx={{
            display: 'flex',
            margin: "50px auto 0px",
            color: '#fff',
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <Pagination
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handleChange} />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Page Size</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={pageSize}
              label="Page Size"
              onChange={handlePageSizeChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={50}>Fifty</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </StyledContainer>
    </StyledWrapper>
  );
}

