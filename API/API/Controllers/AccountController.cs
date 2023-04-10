using API.Data;
using API.Dtos;
using API.Entities;
using API.Helpers;
using API.Service;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly StoreContext context;
        private readonly IMapper mapper;

        public AccountController(UserManager<IdentityUser> _userManager, SignInManager<IdentityUser> _signInManager, IConfiguration _configuration,
             StoreContext _context, IMapper _mapper)
        {
            userManager = _userManager;
            signInManager = _signInManager;
            configuration = _configuration;
            context = _context;
            mapper = _mapper;
        }

        [HttpGet("listUsers")]
        public async Task<ActionResult<List<UserDto>>> GetListUsers([FromQuery] PaginationDto paginationDto)
        {
            var queryable = context.Users.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var users = await queryable.OrderBy(x => x.Email).Paginate(paginationDto).ToListAsync();
            return mapper.Map<List<UserDto>>(users);
        }

        [HttpPost("makeAdmin")]
        public async Task<ActionResult> MakeAdmin([FromBody] string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            await userManager.AddClaimAsync(user, new Claim("role", "admin"));
            return NoContent();
        }

        [HttpPost("removeAdmin")]
        public async Task<ActionResult> RemoveAdmin([FromBody] string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            await userManager.RemoveClaimAsync(user, new Claim("role", "admin"));
            return NoContent();
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] UserCredentials userCredentials)
        {
            var user = new IdentityUser { UserName = userCredentials.Email, Email = userCredentials.Email };
            var result = await userManager.CreateAsync(user, userCredentials.Password);

            if (result.Succeeded)
            {
                return await BuildToken(userCredentials);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserCredentials userCredentials)
        {
            var result = await signInManager.PasswordSignInAsync(userCredentials.Email, userCredentials.Password,
                isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return await BuildToken(userCredentials);
            }
            else
            {
                return BadRequest("Incorrect login");
            }
        }

        private async Task<AuthenticationResponse> BuildToken(UserCredentials userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userCredentials.Email)
            };

            var user = await userManager.FindByNameAsync(userCredentials.Email);
            var claimsDb = await userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDb);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTSettings:TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
