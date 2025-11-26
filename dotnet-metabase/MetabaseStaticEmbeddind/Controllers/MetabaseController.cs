using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace MetabaseStaticEmbeddind.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MetabaseController : Controller
{
    [HttpGet("signed-url")]
    public IActionResult GetSignedUrl()
    {
        string metabaseSiteUrl = "http://localhost:3000";
        string secretKey = "84ecb4c7ce54769a92e33acd9036d65cae52150a67ae0ba74b5cd481369b701c"; // 🔥 TROQUE AQUI

        var payload = new Dictionary<string, object>
        {
            ["resource"] = new Dictionary<string, object>
            {
                ["dashboard"] = 3
            },
            ["params"] = new Dictionary<string, object>()
        };

        var expire = DateTime.UtcNow.AddMinutes(10);

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Claims = payload,
            Expires = expire,
            SigningCredentials = credentials
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwt = tokenHandler.WriteToken(token);

        string iframeUrl = $"{metabaseSiteUrl}/embed/dashboard/{jwt}#theme=night&bordered=true&titled=true";

        return Ok(new { url = iframeUrl });
    }
}
