export type TypesType = {
   slot: number,
   type: { name: string }
}
export type StatsType = {
   base_stat: number
   stat: { name: string }
}
export type PokemonInfoType = {
   id: number
   weight: number,
   height: number,
   base_experience: number
   name: string
   types: TypesType[]
   sprites: { front_default: string }
   stats: StatsType[]
}