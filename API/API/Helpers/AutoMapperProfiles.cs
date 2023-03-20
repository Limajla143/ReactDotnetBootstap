﻿using API.Dtos;
using API.Entities;
using AutoMapper;


namespace MoviesAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<TypesDto, Types>()
                .ForMember(x => x.TypeId, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.TypeName, y => y.MapFrom(z => z.Name)).ReverseMap();
            CreateMap<TypesCreationDto, Types>()
                .ForMember(x => x.TypeName, y => y.MapFrom(z => z.Name));


            CreateMap<BrandDto, Brand>()
                .ForMember(x => x.BrandId, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.BrandName, y => y.MapFrom(z => z.Name)).ReverseMap();
            CreateMap<BrandCreationDto, Brand>()
                .ForMember(x => x.BrandName, y => y.MapFrom(z => z.Name));
        }
    }
}