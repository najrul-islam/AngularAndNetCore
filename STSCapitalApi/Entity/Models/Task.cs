using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataAccess.Models
{
    public partial class Task
    {
        public int  TaskId { get; set; }
        public string TaskGuid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime TaskDate { get; set; }
        public DateTime TaskFromTime { get; set; }
        public DateTime TaskToTime { get; set; }
        public string Location { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
