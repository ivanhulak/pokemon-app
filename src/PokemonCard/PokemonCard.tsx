import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useGenerateRandomColor } from "../utils/useGenerateRandomColor";
import { CardFront } from './CardFront';
import { PokemonInfoType } from './PokemonTypes';
import { CardBack } from './CardBack';

const StyledFlipableCardContainer = styled('div')`
   flex: 0 1 30%;
   height: 475px;
   perspective: 1000px;
`
const StyledCard = styled('div')<{ color: string }>`
   position: relative;
   height: 100%;
   width: 100%;
   padding: 10px;
   border: 3px solid #777;
   border-radius: 24px;
   transform-style: preserve-3d;
   transition: all 1s ease;
   &:hover{
      cursor: pointer;
      box-shadow: 2px 2px 10px 10px #666;
      transform: rotateY(180deg);
   }
   .card-front,
   .card-back{
      position: absolute;
      width: 100%;
      height: 100%;

      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      display: flex;
      flex-direction: column;
      align-items: center;
   }
   .card-front{
      padding-bottom: 20px;
      .card-footer{
         display: flex;
         justify-content: space-around;
         gap: 10px;
         .type{
            color: #fff;
            background-color: #${props => props.color};
            padding: 3px 20px;
            border-radius: 36px;
            font-size: 22px;
         }
      }
   }
   .card-back{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      transform: rotateY(180deg);
      .stat{
         display: flex;
         justify-content: space-between;
         align-items: center;
         gap: 10px;
         width: 90%;
         .stat-name{
            text-transform: capitalize;
            flex: 0 1 30%;
            color: #fff;
            font-size: 22px;
         }
         .stats-line{
            position: relative;
            flex: 0 1 60%;
            height: 10px;
            border-radius: 14px;
            background-color: #fccaca;
         }
      }
   }
`

export const PokemonCard: React.FC<{ url: string }> = ({ url }) => {
   const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoType | undefined>()
   const { color, generateColor } = useGenerateRandomColor();
   useEffect(() => {
      async function getPokemonInfo() {
         const request = axios.get(url);
         const response = await request;
         const parsed = await response.data;
         setPokemonInfo(parsed);
      }
      getPokemonInfo()
      generateColor()
   }, [])

   if (pokemonInfo === undefined) {
      return null;
   } else {
      return (
         <StyledFlipableCardContainer>
            <StyledCard color={color}>
               <CardFront color={color} pokemonInfo={pokemonInfo} />
               <CardBack pokemonStat={pokemonInfo.stats} />
            </StyledCard>
         </StyledFlipableCardContainer>
      );
   }
}

