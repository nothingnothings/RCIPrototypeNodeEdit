// $(document).ready(function () {


//   $('.perk-select').on('change', function () {

//     console.log('ENTERED');
//     $('[.perk-title-control"]').prop('disabled', false);
//     $('[.perk-title-content"]').prop('disabled', false);
//     selection = $(this).val();
//     switch (selection) {
//       case 'perk-1':
//         $('.perk-group-1').show();
//         $('.perk-group-2').hide();
//         $('.perk-group-3').hide();
//         $('.perk-group-2 .perk-title-control').attr('disabled', 'disabled');
//         $('.perk-group-2 .perk-title-content').attr('disabled', 'disabled');
//         $('.perk-group-3 .perk-title-control').attr('disabled', 'disabled');
//         $('.perk-group-3 .perk-title-content').attr('disabled', 'disabled');
//         break;
//       case 'perk-2':
//         $('.perk-group-2').show();
//         $('.perk-group-1').hide();
//         $('.perk-group-3').hide();
//         $('.perk-group-1 .perk-title-control').attr('disabled', 'disabled');
//         $('.perk-group-1 .perk-title-content').attr('disabled', 'disabled');
//         $('.perk-group-3 .perk-title-control').attr('disabled', 'disabled');
//         $('.perk-group-3 .perk-title-content').attr('disabled', 'disabled');
//         break;
//       case 'perk-3':
//         $('.perk-group-3').show();
//         $('.perk-group-2').hide();
//         $('.perk-group-1').hide();
//         $('.perk-group-2 .perk-title-control').attr('disabled', 'disabled');
//         $('.perk-group-2 .perk-title-content').attr('disabled', 'disabled');
//         $('.perk-group-1 .perk-title-control').attr('disabled', 'disabled');
//         $('.perk-group-1 .perk-title-content').attr('disabled', 'disabled');
//         break;
//       default:
//         $('.perk-group-1').hide();
//         $('.perk-group-2').hide();
//         $('.perk-group-3').hide();
//         $(
//           '.perk-group-1 .perk-title-control, .perk-group-1 .perk-title-content, .perk-group-2 .perk-title-control, .perk-group-2 .perk-title-content, .perk-group-3 .perk-title-control, .perk-group-3 .perk-title-content'
//         ).attr('disabled', 'disabled');
//         break;
//     }
//   });
// });
