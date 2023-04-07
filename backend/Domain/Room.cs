using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.API;

namespace Domain
{
	public class Room 
	{

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public User? User;
        public string UserId { get; set;  }
        public string RoomName { get; set; }
		public string RoomType { get; set; }
		public int RoomCapacity { get; set; }
		public string RoomLocation { get; set; }
		public List<RoomFeature> RoomFeatures { get; set; }
        public DateTime CreatedTimeUTC { get; set; }

    }
}

