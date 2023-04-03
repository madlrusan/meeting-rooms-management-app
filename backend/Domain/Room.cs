using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Domain.API;

namespace Domain
{
	public class Room 
	{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedTime { get; set; }
        public bool IsActive { get; set; } = false;
		public string RoomName { get; set; }
		public string RoomType { get; set; }
		public int RoomCapacity { get; set; }
		public string RoomLocation { get; set; }
		public List<RoomFeature> RoomFeatures { get; set; }
        public DateTime CreatedTimeUTC { get; set; }

    }
}

