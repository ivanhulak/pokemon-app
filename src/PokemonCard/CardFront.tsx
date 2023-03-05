import styled from 'styled-components';
import { PokemonInfoType } from './PokemonTypes';

const StyledCardContent = styled('div')`
   width: 100%;
   flex: 1 1 auto;
   .name{
      font-weight: 700;
      color: #fff;
      text-align: center;
      font-size: 28px;
      text-transform: capitalize;
      margin: 15px 0px;
      span{
         margin-left: 10px;
         padding: 3px 10px;
         border-radius: 36px;
         font-size: 22px;
         color: #c0b7b7;
         background-color: rgba(230, 229, 229, 0.3);
      }
   }
   .label{
      display: inline-block;
      background-color: #000;
      color: #fff;
      padding: 5px 15px;
      border-radius: 14px;
      font-size: 18px;
      margin-bottom: 10px;
   }
   .characteristics, .abilities{
      color: #fff;
      display: flex;
      flex-direction: column;
      row-gap: 7px;
      margin-bottom: 15px;
   }
`
const StyledImage = styled('div') <{ background: string, color: string }>`
  background: url(${props => props.background}) center center/contain no-repeat;
  width: 200px;
  height: 200px;
  background-color: #${props => props.color};
  border-radius: 50%;
`
export const CardFront: React.FC<{ color: string, pokemonInfo: PokemonInfoType }> = ({ color, pokemonInfo }) => {
   return (
      <div className='card-front'>
         <StyledImage background={`${pokemonInfo.sprites.front_default}`} color={color} />
         <StyledCardContent color={color}>
            <div className='name'>{pokemonInfo.name} <span>#{pokemonInfo.id}</span></div>
            <div className='label'>Characteristics</div>
            <div className="characteristics">
               <div>Weight: {pokemonInfo.weight}</div>
               <div>Height: {pokemonInfo.height}</div>
               <div>Base experience: {pokemonInfo.base_experience}</div>
            </div>
         </StyledCardContent>
         <div className='card-footer'>
               {pokemonInfo.types.map((type, index) => <span className='type' key={index}>
                  {type.type.name}
               </span>)}
            </div>
      </div>
   );
}


