using AutoMapper;
using DemoPOS.Contracts;
using DemoPOS.DTOs;
using DemoPOS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ProductGroup, ProductGroupResponseDto>();
            CreateMap<Product, ProductResponseDto>()
                .ForMember(dest => dest.ProductGroupName, opt => opt.MapFrom(src => src.ProductGroup.ProductGroupName));

            CreateMap<Product, ProductResponse>()
                .ForMember(dest => dest.ProductGroupName, opt => opt.MapFrom(src => src.ProductGroup.ProductGroupName));

            CreateMap<Order, OrderResponseDto>();
            CreateMap<Order, OrderWithDetailResponseDto>()
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));
            CreateMap<OrderDetail, OrderDetailResponseDto>()
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.ProductName))
                .ForMember(dest => dest.Thumbnail, opt => opt.MapFrom(src => src.Product.Thumbnail));

            CreateMap<ProductGroupRequestDto, ProductGroup>();
            CreateMap<ProductRequestDto, Product>();

            CreateMap<OrderRequestDto, Order>()
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));
            CreateMap<OrderDetailRequestDto, OrderDetail>();
        }
    }
}