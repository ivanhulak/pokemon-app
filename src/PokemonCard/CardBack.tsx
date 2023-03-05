import styled from 'styled-components';
import { StatsType } from './PokemonTypes';

const StyledPokemonStat = styled('div') <{ value: number }>`
   position: absolute;
   background-color: #fc4d4d;
   width: ${props => props.value}%;
   height: 100%;
   border-radius: 14px;
`

export const CardBack: React.FC<{ pokemonStat: StatsType[] }> = ({ pokemonStat }) => {
   return (
      <div className='card-back'>
         {pokemonStat.map((statItem, index) => <div className='stat' key={index}>
            <div className='stat-name'>{statItem.stat.name}:</div>
            <div className='stats-line'>
               <StyledPokemonStat value={statItem.base_stat}></StyledPokemonStat>
            </div>
         </div>)}
      </div>
   );
}